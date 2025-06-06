import { Link } from 'react-router-dom';
import { navLinks } from './../data/NavLinksData';

const dashboardLink = navLinks.find((link) => link.title === "Dashboard");

export default function notFound() {
  return(
    <div className='bg-zinc-100 flex w-full h-dvh justify-center items-center'>
      <section className='flex flex-col justify-center items-center gap-3 bg-white px-4 2xs:w-[350px] xs:w-[420px] sm:w-full h-full  max-w-[600px] max-h-[300px] shadow-md rounded-xl mx-4'>
          <h1 className='self-center text-2xl sm:text-3xl md:text-4xl font-bold text-center'>Página não encontrada!</h1>
        <p className='text-center sm:text-lg md:text-xl'>A página que você está tentando acessar não existe.</p>
        {dashboardLink && (
          <Link to="/home" className='flex items-center gap-2 bg-sky-500 hover:bg-sky-600 cursor-pointer text-sm xs:text-base text-white mt-5 px-3 py-1 rounded-md'>
            {dashboardLink.icon}
            Voltar para {dashboardLink.title}
          </Link>
        )}
      </section>
    </div>
  )
}