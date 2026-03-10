import Image from 'next/image';
import logo from './image.png'
// import meta from '../../app/provider/images/meta.png'
import meta from './meta.png'

export default function InitialLoading() {
    return (
      <>
        <div className="flex flex-col items-center justify-between min-h-screen bg-white dark:bg-[rgb(12,16,20)]">
          <div className="flex flex-1 items-center">
            <Image src={logo} alt="Instagram" width={90} priority />
          </div>

          <div className="flex flex-col items-center mb-8">
            {/* <p className="text-sm text-gray-400 dark:text-gray-500 mb-1">
              from
            </p>
            <Image src={meta} alt="Meta" width={100} /> */}
            <Image src={meta} alt='Meta' width={70}/>
          </div>
        </div>
      </>
    );
}
