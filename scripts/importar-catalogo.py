"""Gera public/catalogo.json e src/lib/catalogo-resumo.json a partir da exportação "Produtos e serviços" do DigiSat (.xls).

Uso (na raiz do projeto):  python3 scripts/importar-catalogo.py caminho/Produtos_e_servicos.xls
Requer: pip install xlrd

Publica apenas dados de catálogo (código, nome, marca, categoria, unidade e variações).
Preço, custo, estoque e dados fiscais NÃO são exportados.
Entram só itens de revenda ativos que venderam nos últimos 3 anos ou têm estoque.
"""
import datetime, json, re, sys, unicodedata
import xlrd

ANOS = 3

# Categorias publicadas no site.
CATS = [
    ("altura", "Trabalho em altura"),
    ("cabeca", "Cabeça, olhos e face"),
    ("auditiva", "Proteção auditiva"),
    ("respiratoria", "Proteção respiratória"),
    ("maos", "Luvas e mangotes"),
    ("pes", "Calçados"),
    ("vestimentas", "Vestimentas e uniformes"),
    ("sinalizacao", "Sinalização, bloqueio e incêndio"),
    ("ferramentas", "Ferramentas manuais"),
    ("eletricas", "Ferramentas elétricas"),
    ("construcao", "Construção, elétrica e hidráulica"),
    ("amarracao", "Amarração, elevação e escadas"),
    ("limpeza", "Higiene e limpeza"),
    ("utilidades", "Campo, camping e utilidades"),
]
OUTROS = ("outros", "Outros itens")

# 1) Subgrupos do DigiSat que já dizem a categoria.
SUBGRUPO = {
    "PROTECAO EM ALTURA": "altura", "PROTECA EM ALTURA": "altura",
    "PROTECAO VISUAL": "cabeca", "PROTECAO PARA A CABECA": "cabeca", "CAPACETES": "cabeca", "CAPACETE": "cabeca",
    "PROTECAO FACIAL": "cabeca", "PROTETOR FACIAL": "cabeca", "MASCARA DE SOLDA": "cabeca", "MASCARA DE SOLDA AUTOMATICA": "cabeca",
    "CARNEIRA": "cabeca", "JUGULAR": "cabeca",
    "PROTECAO AUDITIVA": "auditiva", "PROTECAO AUDITIVA TIPO CONCHA": "auditiva", "PROTECAO AUDITIVA TIPO PLUG": "auditiva",
    "PROTECAO RESPIRATORIA": "respiratoria",
    "LUVAS": "maos", "LUVAS REVESTIDAS": "maos", "LUVAS DESCARTAVEIS": "maos", "LUVAS LATEX": "maos", "LUVAS ANTI CORTE": "maos",
    "LUVAS PVC": "maos", "LUVAS DE COURO": "maos", "LUVAS ANTI VIBRACAO / IMPACTO": "maos", "LUVA ESPORTIVA": "maos",
    "LUVA ALTA/BAIXA TEMPERATURA": "maos", "LUVA ALTA TENSAO": "maos", "LUVAS TRICOTADAS": "maos", "PROTECAO PARA MAOS E BRACOS": "maos",
    "BOTAS E BOTINAS": "pes", "BOTINA NOBUCK": "pes", "BOTINA PVC": "pes", "BOTINA COURO - OPERACIONAL": "pes", "SAPATO": "pes",
    "ANTIDERRAPANTES": "pes", "CALCADOS AVENTURA": "pes", "COTURNOS": "pes", "PROTECAO PARA OS PES": "pes", "PERNEIRA": "pes",
    "VESTIMENTAS E ACESSORIOS": "vestimentas", "UNIFORMES RISCO 2": "vestimentas", "CAPA DE CHUVA": "vestimentas",
    "VESTIMENTAS EM COURO": "vestimentas", "CAMISAS": "vestimentas", "COLETES": "vestimentas", "CONJUNTO APICULTOR": "vestimentas",
    "VESTIMENTA MOTOSSERISTA": "vestimentas", "CALCAS": "vestimentas", "CONJUNTOS HERBICIDA E AGROTOXICO": "vestimentas",
    "CONJUNTO FARDAMENTO": "vestimentas", "MACACAO": "vestimentas", "VESTIMENTAS PARA FRIO": "vestimentas",
    "FARDAMENTO PROD. PROPRIA": "vestimentas", "CALCA PVC": "vestimentas", "TOUCAS": "vestimentas", "AVENTAL PVC": "vestimentas",
    "DESCARTAVEIS": "vestimentas", "APICULTURA": "vestimentas", "COLETE REFLETIVO": "sinalizacao",
    "PLACAS DE SINALIZACAO": "sinalizacao", "SINALIZACAO": "sinalizacao", "PROTECAO CONTRA INCENDIO": "sinalizacao",
    "CADEADOS": "sinalizacao", "CADEADOS LATAO": "sinalizacao", "CADEADO CORES": "sinalizacao", "CONES": "sinalizacao",
    "TELA TAPUME E SINALEIRO": "sinalizacao", "SINALIZACAO LUMINOSA": "sinalizacao", "CORRENTES": "sinalizacao",
    "BANDEIROLA": "sinalizacao", "CORDA ZEBRADA": "sinalizacao", "EXTINTOR": "sinalizacao", "LUMINARIAS DE EMERGENCIA": "sinalizacao",
    "FERRAMENTAS MANUAIS": "ferramentas", "TRENAS": "ferramentas", "CAIXA PARA FERRAMENTAS": "ferramentas",
    "BOLSA PARA FERRAMENTAS": "ferramentas", "CANIVETES": "utilidades", "CAPAS E BAINHAS": "ferramentas", "ESCOVAS DE ACO": "ferramentas",
    "MEDIDORES DE TENSAO": "ferramentas",
    "ACESSORIOS PARA FERRAMENTAS ELETRICAS": "eletricas", "FURADEIRAS/PARAFUSADEIRAS": "eletricas", "DISCO DESBASTE / LIXA": "eletricas",
    "DISCO CORTE PISO E CONDRETO": "eletricas", "DISCO CORTE MADEIRA": "eletricas", "DISCO CORTE METAL": "eletricas", "LIXAS": "eletricas",
    "SOPRADOR TERMICO": "eletricas", "TRENA E NIVEL A LASER": "eletricas", "FERRO DE SOLDA": "eletricas", "RETIFICA/MICRORETIFICA": "eletricas",
    "ESMERILHADEIRA": "eletricas", "SERRA TICO-TICO": "eletricas", "MAQUINAS PARA SOLDA": "eletricas", "MARTELETE PERFURADOR": "eletricas",
    "LIXADEIRAS": "eletricas", "SERRA MARMORE": "eletricas", "SERRA CIRCULAR": "eletricas", "MOTOESMERIL": "eletricas",
    "MISTRURADOR": "eletricas", "SERRA ESQUADRIA": "eletricas", "ASPIRADOR": "eletricas", "POLITRIZ": "eletricas",
    "BOMBAS DE SUCCAO": "eletricas", "ESTANHO": "eletricas",
    "MATERIAL ELETRICO": "construcao", "MATERIAL DE CONSTRUCAO": "construcao", "MATERIAL HIDRAULICO": "construcao",
    "PARAFUSOS / PORCAS E ARRUELA  / REBITES": "construcao", "FERRAGENS": "construcao", "FITAS ADESIVAS": "construcao",
    "FITA ISOLANTE CORES": "construcao", "FITA ISOLANTE AUTA FUSAO": "construcao", "TELAS HEXAGONAIS": "construcao",
    "LONA CARRETEIRO": "construcao", "LONA PLASTICA PRETA": "construcao", "ABRACADEIRA DE NYLON": "construcao",
    "ABRACADEIRA METAL": "construcao", "COLAS E ADESIVOS INSTANTANEOS": "construcao", "LUBRIFICANTES / DESENGRIPANTES": "construcao",
    "PISO EMBORRACHADO": "construcao", "EXTENSAO E FILTRO DE LINHA": "construcao", "MANGUEIRA DE NIVEL": "construcao",
    "AMARRACAO": "amarracao", "ELEVACAO": "amarracao", "ESCADA DE ALUMINIO": "amarracao", "ESCADA DE FIBRA": "amarracao",
    "LIXEIRAS": "limpeza", "HIGIENE EM GERAL": "limpeza", "HIGIENE E LIMPEZA": "limpeza", "VASSOURAS E RODOS": "limpeza",
    "PAPEL TOALHA E PAPEL HIGIENICO": "limpeza", "DISPENSER": "limpeza", "PROTECAO PARA PELE": "maos", "PROTEÇÃO PARA PELE": "maos",
    "PROTETOR SOLAR": "maos", "CREMES": "maos",
    "UTILIDADES": "utilidades", "GARRAFAS TERMICAS": "utilidades", "JARDINAGEM": "utilidades", "CAMPING/ LAZER/ PESCA": "utilidades",
    "CAIXAS E BOLSAS TERMICAS": "utilidades", "LANTERNAS": "utilidades", "RECIPIENTES DIVERSOS": "utilidades", "PILHA E BATERIA": "utilidades",
    "LANTERNAS E LUMINARIAS": "utilidades", "MANGEUIRA JARDIM": "utilidades", "RECIPIENTES": "utilidades", "CAMPING": "utilidades",
    "CANTIL": "utilidades", "MOCHILAS": "utilidades", "BARRACAS": "utilidades", "PULVERIZADOR MANUAL": "utilidades",
    "PULVERIZADOR COSTA": "utilidades", "COMBATE A ENDEMIAS": "utilidades",
    "FITAS": "sinalizacao",
}

# 2) Para subgrupos genéricos (catálogos, sem grupo), olha o início das palavras da descrição.
REGRAS = [
    ("altura", r"\b(CINTO PARAQ|CINTO TIPO PARA|CINTURAO|TALABARTE|TRAVA ?QUEDAS?|LINHA DE VIDA|MOSQUETAO|ANCORAG|ABSORVEDOR|FITA ANEL|ASCENSOR|DESCENSOR|CINTO DE SEG|CINTO SEG|CINTO PARAQUEDISTA|CINTO ABDOMINAL)"),
    ("maos", r"^(LUVA|MANGOTE|DEDEIRA|CREME|PROTETOR SOLAR)"),
    ("pes", r"^(BOTINA|BOTA|SAPATO|COTURNO|TENIS|CALCADO|PALMILHA|GALOCHA|PERNEIRA|SAPATILHA)"),
    ("cabeca", r"^(CAPACETE|JUGULAR|CARNEIRA|OCULOS|VISEIRA|PROTETOR FACIAL|MASCARA (DE )?SOLDA|ESCUDO|LENTE|TOUCA ARABE|BONE ARABE|CAPUZ)"),
    ("auditiva", r"^(PROTETOR AUDITIVO|PROTETOR AURICULAR|ABAFADOR|PLUG|CONCHA)"),
    ("respiratoria", r"^(RESPIRADOR|MASCARA|PFF|SEMI ?FACIAL|FILTRO|CARTUCHO|PRE.?FILTRO|RETENTOR)"),
    ("vestimentas", r"^(CAMISA|CALCA|JALECO|AVENTAL|MACACAO|JAQUETA|CAPA (DE )?CHUVA|CAPA PVC|COLETE|UNIFORME|CONJUNTO (AGRO|APLIC|HERBIC|MOTO|RETARD|DE CALCA|APICULT|FARDAM|KP|IMPERM|PVC|CHUVA|EM LEPROMIX|BRIM|JALECO)|CONJ APLIC|BLUSA|CAMISETA|JAPONA|BERMUDA|MANGA|TOUCA|BALACLAVA|BONE|CHAPEU|VESTIMENTA|BLUSAO|PROTETOR DE NUCA)"),
    ("sinalizacao", r"^(PLACA|CONE|FITA ZEBRADA|FITA DEMARC|FITA REFLETIVA|CORRENTE PLAST|CORRENTE ZEBR|BARREIRA|CAVALETE|EXTINTOR|SINALIZ|ETIQUETA|CADEADO|BANDEIROLA|GIROFLEX|BASTAO|LAVA.?OLHOS|CHUVEIRO)"),
    ("amarracao", r"^(ESCADA|CINTA|CATRACA (DE|P) ?CARGA|CATRACA P/ CARGA|CORDA|ESTICADOR|MANILHA|LACO|SAPATILHA P|GANCHO|TALHA|MOITAO|CABO DE ACO|CORRENTE)"),
    ("eletricas", r"^(FURADEIRA|PARAFUSADEIRA|ESMERILHADEIRA|LIXADEIRA|SERRA (CIRC|TICO|MARM|SABRE|ESQ)|MARTELETE|SOPRADOR|RETIFICA|MICRORETIFICA|POLITRIZ|PLAINA|TUPIA|MOTOESMERIL|MISTURADOR|ASPIRADOR|COMPRESSOR|LAVADORA|INVERSORA|MAQUINA|DISCO|BROCA|LIXA|SERRA COPO|BATERIA|CARREGADOR|ESCOVA|REBOLO|FERRO DE SOLDA|ELETRODO|ARAME (DE )?SOLDA|BOMBA|GERADOR|ROCADEIRA|MOTOSSERRA|PISTOLA (DE )?PINTURA|PISTOLA (DE )?COLA|SUPORTE P/ FURAD|MANDRIL|BASE)"),
    ("construcao", r"^(PARAFUSO|PORCA|ARRUELA|REBITE|BUCHA|PREGO|FITA (ISOLANTE|ADESIVA|CREPE|DUPLA|VEDA|SILVER|ALTA FUSAO)|FIO|CABO (PP|FLEX|PARALELO)|TOMADA|INTERRUPTOR|PLUGUE|LAMPADA|REATOR|DISJUNTOR|TUBO|CANO|JOELHO|LUVA (SOLD|ROSC|PVC)|TE |REGISTRO|TORNEIRA|ADAPTADOR|CONEXAO|NIPLE|BUJAO|CAP |CURVA|BUCHA|SIFAO|VALVULA|ENGATE|BOIA|CAIXA D|ABRACADEIRA|SILICONE|COLA|ADESIVO|VEDA|ARGAMASSA|REJUNTE|LONA|TELA|ARAME|DOBRADICA|FECHADURA|TRINCO|FERROLHO|CADEADO|MACANETA|PUXADOR|EXTENSAO|FILTRO DE LINHA|BENJAMIM|PINO|SOQUETE (E27|PORC)|LUMINARIA|REFLETOR|SPRAY|TINTA|DESENGRIPANTE|LUBRIFICANTE|GRAXA|OLEO|THINNER|SELADOR|MASSA|ESPUMA|IMPERMEAB|MANGUEIRA)"),
    ("limpeza", r"^(VASSOURA|RODO|PANO|DETERGENTE|SABAO|SABONETE|ALCOOL|DESINFET|AGUA SANIT|LIXEIRA|SACO (DE |P/ ?)?LIXO|SACO ALVEJ|PAPEL TOALHA|PAPEL HIGI|DISPENSER|BALDE|ESPONJA|MOP|PA (DE )?LIXO|LIMPA|FLANELA|ESCOVA SANIT|DESODORIZ|ODORIZ|CERA|MULTIUSO|SAPONACEO|LUSTRA|REFIL)"),
    ("utilidades", r"^(GARRAFA|GARRAFAO|JARRA|COPO|CANECA|TERMICA|BOTIJAO|LANTERNA|LUMINARIA|PILHA|CAMPING|BARRACA|COOLER|CAIXA TERM|BOLSA TERM|MOCHILA|CANIVETE|FACA|CANTIL|ISQUEIRO|PULVERIZADOR|REGADOR|ESGUICHO|CADEIRA|COLCHAO|REDE|SACO DE DORMIR|VARA|ANZOL|LINHA DE PESCA|MOLINETE|CARRETILHA|APITO|BUSSOLA|RELOGIO|TERMOMETRO|RECIPIENTE|POTE|BACIA)"),
    ("ferramentas", r"^(CHAVE|ALICATE|MARTELO|MARRETA|TRENA|NIVEL|ESTILETE|LAMINA|SERROTE|ARCO|TALHADEIRA|PONTEIRO|FORMAO|LIMA|GROSA|SOQUETE|CATRACA|TORQUIMETRO|JOGO|KIT|MACHADO|MACHADINHA|FACAO|ENXADA|ENXADAO|PA |PAS |PICARETA|PICAO|ALAVANCA|CAVADEIRA|ANCINHO|GARFO|FORCADO|FOICE|PODAO|TESOURA|TESOURAO|SERRA|GRAMPEADOR|GRAMPO|REBITADOR|PISTOLA|ESPATULA|DESEMPENADEIRA|COLHER|PRUMO|ESQUADRO|LINHA|GIZ|MARCADOR|LAPIS|CANETA|TORNO|SARGENTO|MORSA|EXTRATOR|BITS?|PONTA|PONTEIRA|ADAPTADOR|EXTENSOR|CABO P|CABO DE|CABO MADEIRA|CARRINHO|CORTADOR|SACA|TAPA|MEDIDOR|MULTIMETRO|ALICATE|PAQUIMETRO|BROXA|PINCEL|ROLO|TRINCHA|BANDEJA|CAIXA (P/? ?)?FERR|CAIXA ORGAN|MALETA|BOLSA|CINTO PORTA|PORTA|ORGANIZADOR|FITA METRICA|MAÇARICO|MACARICO|LANCA|ESCOVA)"),
]

# 3) Última tentativa: palavra-chave em qualquer parte da descrição.
CONTEM = [
    ("altura", r"TRAVA.?QUEDA|TALABARTE|CINTO PARAQ"),
    ("pes", r"BOTINA|CALCADO|SAPATO|\bBOTA\b"),
    ("cabeca", r"JUGULAR|CAPACETE|OCULOS"),
    ("respiratoria", r"RESPIRADOR|\bPFF"),
    ("auditiva", r"AURICULAR|DECIBELIMETRO"),
    ("vestimentas", r"FARDAMENTO|CAMISA|\bMEIA\b|CINTO ERGON|CALCA"),
    ("sinalizacao", r"ZEBRAD|REFLETIV|PEDESTAL"),
    ("limpeza", r"LIXO|CESTO|HAMPER|ABSORVENTE|BOMBONA"),
    ("construcao", r"ELETRODUTO|CAIXA (DE )?LUZ|TARRAXA|FITA EMPAC|ESTANHO"),
]

def categoria(sub, desc):
    sub_n = sem_acento(sub.upper()).strip()
    if sub_n in SUBGRUPO:
        return SUBGRUPO[sub_n]
    d = sem_acento(desc.upper()).strip()
    for cid, rx in REGRAS:
        if re.search(rx, d):
            return cid
    for cid, rx in CONTEM:
        if re.search(rx, d):
            return cid
    if "EPI" in sub_n:
        return OUTROS[0]
    if "FERRAMENTAS" in sub_n:
        return "ferramentas"
    return OUTROS[0]

SIGLAS = {"EPI", "EPC", "CA", "PVC", "PU", "PFF", "PFF1", "PFF2", "PFF3", "NR", "ATPV", "EVA", "LED", "USB", "INMETRO", "ABNT",
          "PP", "PE", "PC", "ABS", "AC", "DC", "V", "W", "MM", "CM", "M", "KG", "G", "P", "GG", "XG", "EG", "XGG", "SDS", "HSS", "TNT",
          "UV", "3M", "II", "III", "IV", "C/", "S/", "BI", "MG"}

def sem_acento(s):
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")

def nome_bonito(desc):
    d = re.sub(r"\s*\((ST|NT|T)\)\s*$", "", desc.strip())
    d = re.sub(r"\s+", " ", d)
    out = []
    for i, w in enumerate(d.split(" ")):
        up = w.upper()
        if up in SIGLAS or re.search(r"\d", w) or (len(w) <= 3 and w.isupper() and not w.isalpha()):
            out.append(up if up not in ("C/", "S/") else up.lower())
        else:
            low = w.lower()
            out.append(low.capitalize() if i == 0 else low)
    return " ".join(out)

def marca_bonita(m):
    m = re.sub(r"\s+", " ", m.strip())
    return " ".join(w if (len(w) <= 3 or re.search(r"\d", w)) else w.capitalize() for w in m.split(" "))

def chave_var(v):
    n = re.search(r"\d+([.,]\d+)?", v)
    return (0, float(n.group().replace(",", ".")), v) if n else (1, 0, v)

def variacoes(info):
    vals = re.findall(r"QUANT[^-]*-\s*([^:]+):", info or "")
    out = []
    for v in vals:
        v = v.strip().replace("N°", "Nº")
        if v and v not in out:
            out.append(v)
    return sorted(out, key=chave_var)

def main(caminho):
    sh = xlrd.open_workbook(caminho).sheet_by_index(0)
    head = [c.value for c in sh.row(7)]
    ix = {h: i for i, h in enumerate(head) if h}
    corte = datetime.datetime.now() - datetime.timedelta(days=365 * ANOS)
    itens, vistos = [], set()
    for r in range(8, sh.nrows):
        row = sh.row_values(r)
        g = lambda k: row[ix[k]]
        cod = str(g("Código")).strip().replace(".0", "")
        if not cod or cod in vistos:
            continue
        if g("Ativo") != "Sim" or g("Vendável") != "Sim" or g("Tipo") != "Produto" or g("Tipo do item") != "Mercadoria para Revenda":
            continue
        try:
            uv = float(g("Data/hora última venda") or 0)
            ultima = xlrd.xldate_as_datetime(uv, 0) if uv > 0 else None
        except Exception:
            ultima = None
        try:
            estoque = float(g("Quantidade saldo") or 0) > 0 or float(g("Quantidade") or 0) > 0
        except Exception:
            estoque = False
        if not ((ultima and ultima >= corte) or estoque):
            continue
        desc = str(g("Descrição")).strip()
        if not desc:
            continue
        sub = str(g("Subgrupo")).strip()
        marca = str(g("Marca")).strip()
        if re.fullmatch(r"\d+", marca):
            marca = ""
        vistos.add(cod)
        itens.append({
            "id": cod,
            "n": nome_bonito(desc),
            "m": marca_bonita(marca),
            "c": categoria(sub, desc),
            "u": str(g("Unidade")).strip(),
            "v": variacoes(str(g("Informações do estoque"))),
        })
    itens.sort(key=lambda x: sem_acento(x["n"].lower()))
    cats = [{"id": c[0], "nome": c[1]} for c in CATS] + [{"id": OUTROS[0], "nome": OUTROS[1]}]
    out = {"geradoEm": datetime.date.today().isoformat(), "categorias": cats, "itens": itens}
    with open("public/catalogo.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
    from collections import Counter
    cnt = Counter(i["c"] for i in itens)
    resumo = {
        "geradoEm": out["geradoEm"],
        "total": len(itens),
        "marcas": len({i["m"] for i in itens if i["m"]}),
        "porCategoria": {c["id"]: cnt.get(c["id"], 0) for c in cats},
    }
    with open("src/lib/catalogo-resumo.json", "w", encoding="utf-8") as f:
        json.dump(resumo, f, ensure_ascii=False, indent=2)
    print(f"{len(itens)} itens")
    for c in cats:
        print(f"  {c['nome']}: {cnt.get(c['id'], 0)}")

if __name__ == "__main__":
    main(sys.argv[1])
