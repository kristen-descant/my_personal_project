import errorImg from '../media/404Page.jpg'

export default function Error404Page() {
    return (
        
        <div className="bg-cover bg-center h-screen flex justify-center items-center" style={{backgroundImage: `url(${errorImg})`  }}>
            <div className='text-lg sm:text-xl md:text-2xl lg:text-4xl text-white'>
                Error 404 Page Not Found
            </div>    
        </div>
    );
  }