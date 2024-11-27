import { useRouter } from "next/navigation"

export async function RefreshComponent(props: any) {
    const router = useRouter();
    router.refresh()
}