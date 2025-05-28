import CardBox from "@/components/CardBox"

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-[85vh]">
        <CardBox>{children}</CardBox>
    </div>
  )
}

export default layout