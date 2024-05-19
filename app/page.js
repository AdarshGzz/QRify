import  Content  from "@/components/Content";
import Logo from "@/components/Logo";


export default function Home() {
  return (
    <main className="custom-gradient h-screen w-screen scroll-none flex flex-col items-center justify-center gap-2 ">
      <Logo/>
      <Content/>
   </main>
  );
}