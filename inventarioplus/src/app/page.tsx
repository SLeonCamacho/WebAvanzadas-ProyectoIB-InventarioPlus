import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div>Esta es una landing page para el proyecto InventarioPlus</div>
      <div>
        <Link href="/login">Login</Link>
      </div>
    </main>
  );
}
