import Header from "@/components/layouts/Header";
import Main from "@/components/layouts/Main";

export default function AboutMePage(){
    return (
        <>
            <Header title="About me"></Header>
            <Main>
                <div className="flex flex-col gap-2 text-xl">
                    <div className="flex gap-3">
                        <span className="font-semibold">Imie:</span>
                        <span>Mateusz</span>
                    </div>
                    <div className="flex gap-3">
                        <span className="font-semibold">Nazwisko:</span>
                        <span>Rączka</span>
                    </div>
                    <div className="flex gap-3">
                        <span className="font-semibold">Numer indeksu:</span>
                        <span>14615</span>
                    </div>
                </div>
            </Main>
        </>
    )
}