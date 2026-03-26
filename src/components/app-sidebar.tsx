"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import {
  ClipboardListIcon,
  HistoryIcon,
  PackageIcon,
  TruckIcon,
  CirclePlusIcon,
} from "lucide-react"
import Image from "next/image"
import { NovaSolicitacaoQuickDialog } from "@/components/dashboard/nova-solicitacao-quick"

interface Props extends React.ComponentProps<typeof Sidebar> {
  user: { name: string; email: string; role: string }
  fornecedores?: { id: string; nome: string }[]
}

export function AppSidebar({ user, fornecedores = [], ...props }: Props) {
  const pathname = usePathname()

  const navMain = [
    {
      title: "Solicitações",
      url: "/painel/solicitacoes",
      icon: <ClipboardListIcon />,
      isActive: pathname === "/painel/solicitacoes",
    },
    {
      title: "Histórico",
      url: "/painel/historico",
      icon: <HistoryIcon />,
      isActive: pathname === "/painel/historico",
    },
  ]

  const navCadastros = [
    {
      title: "Produtos",
      url: "/painel/produtos",
      icon: <PackageIcon />,
      isActive: pathname === "/painel/produtos",
    },
    {
      title: "Fornecedores",
      url: "/painel/fornecedores",
      icon: <TruckIcon />,
      isActive: pathname === "/painel/fornecedores",
    },
  ]

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5! data-[slot=sidebar-menu-button]:h-auto!"
              render={<Link href="/painel" />}
            >
              <Image src="/logo-jacoseg.png" alt="JacoSeg" width={110} height={44} className="h-auto w-auto dark:invert" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              <SidebarMenuItem className="flex items-center gap-2">
                <NovaSolicitacaoQuickDialog fornecedores={fornecedores}>
                  <SidebarMenuButton
                    tooltip="Nova Solicitação"
                    className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
                  >
                    <CirclePlusIcon />
                    <span>Nova Solicitação</span>
                  </SidebarMenuButton>
                </NovaSolicitacaoQuickDialog>
              </SidebarMenuItem>
            </SidebarMenu>
            <NavMain items={navMain} />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Cadastros</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navCadastros.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={item.isActive}
                    render={<Link href={item.url} />}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user.name,
            email: user.email,
            avatar: "",
          }}
          onSignOut={() => signOut({ callbackUrl: "/login" })}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
