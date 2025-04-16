import { Reset } from "@/components/ui/ResetForm"


export default function ForgotPassword() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-muted p-6 md:p-10">
              <div className="w-full max-w-sm md:max-w-3xl h-full">
                <Reset />
              </div>
            </div>
    )
}