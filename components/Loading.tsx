import { MoonLoader } from "react-spinners"


function Loading() {
    return (
        <div className="fixed flex-col inset-0 flex w-full bg-black/40 items-center justify-center gap-4 h-screen">
            <MoonLoader
            size={50}
            color="oklch(70.4% 0.04 256.788)"
            cssOverride={{
                backgroundColor: "transparent",
                borderRadius: "50%",
                borderWidth: "6.5px",
                // borderStyle: "solid",
                borderColor: "oklch(44.6% 0.03 256.802)",
            }}
            />
        </div>
    )
}

export default Loading