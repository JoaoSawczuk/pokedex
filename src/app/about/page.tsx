import Link from "next/link";
//import styles from "./page.module.css";

export default function About() {
    return (
      <div className="main">
        <main className="flex flex-col gap-[60px] row-start-2 items-center sm:items-start text-4xl font-bold">
          <h1>Tela do About</h1>
          <Link href="/" className="text-red-100 hover:underline">Voltar para Home</Link>
        </main>
      </div>
    );
  }