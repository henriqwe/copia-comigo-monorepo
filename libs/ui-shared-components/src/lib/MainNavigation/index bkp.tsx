import { ChevronDoubleLeftIcon,ChevronDownIcon,ChevronDoubleRightIcon, SearchIcon, ChartSquareBarIcon } from "@heroicons/react/outline";
import { ReactChild, useState } from "react";
import Level1 from './MenuItemLevel1'
import Level2 from './MenuItemLevel2'
import Level3 from './MenuItemLevel3'

/* eslint-disable-next-line */
export interface MainNavigationProps {
  mainMenuItens: [
    {
      title: string
      icon: ReactChild
      url: string
      children?: {
        title: string
        url: string
        icon: ReactChild
        children?: {
          title: string
          url: string
          icon: ReactChild
        }[]
      }[]
    }
  ]
}

export function MainNavigation({ mainMenuItens }: MainNavigationProps) {
  const [open,setOpen] = useState(false)
  const [openMenu,setOpenMenu] = useState(true)
  return (
      <aside className={`side-nav ${openMenu ?'w-64' :'w-20'} h-full bg-gray-900`}>
      {/* Logo */}
        <div className="px-6 pt-8 block">
          <div className="flex items-center justify-between">
            <a href="#" className="bg-blue-600 p-1.5 rounded dlex items-center justify-center focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900">
              <svg className="w-5 h-5 text-white stroke-current" viewBox="0 0 24 24" fill="none">
                <path d="M12 4.75L19.25 9L12 13.25L4.75 9L12 4.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.25 12L4.75 15L12 19.25L19.25 15L14.6722 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <button className={`flex items-center justify-center p-0.5 rounded bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 ${!openMenu && 'ml-8'}`} onClick={()=> setOpenMenu(!openMenu)}>
        
              {openMenu ?
              <ChevronDoubleLeftIcon className="w-5 h-5 text-white" />
              :
              <ChevronDoubleRightIcon className="w-5 h-5 text-white" /> }
         
            </button>
          </div>   
        </div>
        {/* input Search */}
        <div className='px-6 pt-4 block'>
          <div className='relative'onClick={()=>setOpenMenu(true)}>
          <div className="absolute inset-y-0 left-0 flex items-center pl-2" >
          <SearchIcon className="w-4 h-4 text-gray-500" />
          </div>
            <input type="text" placeholder="Busca" className={`${openMenu ?'w-full' :'w-1'} rounded pl-8 pr-4 py-2.5 text-xs font-light bg-gray-800 text-gray-400 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800`}/>
          </div>
        </div>
        {/* Separator */}
        <div className='px-6 pt-4'>
          <hr className='border-gray-700'/>
        </div>
        {/* items */}
        <div className='relative'>
          <div className='overflow-y-auto max-h-96'>
            {/* Items 1 */}
            <div className='px-6 pt-4'>
              <ul className='flex flex-col space-y-2'>
                <li className="relative text-gray-500 hover:text-white focus-within:text-white">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <ChartSquareBarIcon className="w-5 h-5 text-white text-gray-500" />
                  </div>
                  <a href="#" className="inline-block w-full py-2 pl-8 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 keychainify-checked">Dashboard</a>
                </li>
                <li className="">
                  <div className="relative text-gray-500 hover:text-white focus-within:text-white flex justify-between ">
                  <div className='flex items-center w-full'>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                    <ChartSquareBarIcon className="w-5 h-5 text-white text-gray-500" />
                      </div>
                      <a href="#" className="inline-block w-full py-2 pl-8 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 keychainify-checked">Content</a>
                  </div>
                    <button className="absolute right-0 flex items-center p-1" tabIndex={-1} onClick={() => {setOpen(!open)}}>
                    <ChevronDownIcon className="w-4 h-4 text-white text-gray-500" />
                    </button>
                  </div>
                  <div className='pt-2 pl-4'>
                  { open && <ul className='side-menu__sub-open flex flex-col pl-2 text-gray-500 border-l border-gray-700'>
                      <li ><a href="#" className="inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white keychainify-checked">Courses</a></li>
                      <li ><a href="#" className="inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white keychainify-checked">Categories</a></li>
                      <li ><a href="#" className="inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white keychainify-checked">Instructors</a></li>
                      <li ><a href="#" className="inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white keychainify-checked">Video Libary</a></li>
                    </ul>}
                    
                  </div>
                </li>
                <li className="relative text-gray-500 hover:text-white focus-within:text-white">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <ChartSquareBarIcon className="w-5 h-5 text-white text-gray-500" />
                  </div>
                  <a href="#" className="inline-block w-full py-2 pl-8 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 keychainify-checked">Design</a>
                </li>
                <li className="relative text-gray-500 hover:text-white focus-within:text-white">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <ChartSquareBarIcon className="w-5 h-5 text-white text-gray-500" />
                  </div>
                  <a href="#" className="inline-block w-full py-2 pl-8 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 keychainify-checked">Markert & Sell</a>
                </li>
                <li className="relative text-gray-500 hover:text-white focus-within:text-white">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <ChartSquareBarIcon className="w-5 h-5 text-white text-gray-500" />
                  </div>
                  <a href="#" className="inline-block w-full py-2 pl-8 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 keychainify-checked">Reporting</a>
                </li>
                <li className="relative text-gray-500 hover:text-white focus-within:text-white">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <ChartSquareBarIcon className="w-5 h-5 text-white text-gray-500" />
                  </div>
                  <a href="#" className="inline-block w-full py-2 pl-8 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 keychainify-checked">Support</a>
                </li>
              </ul>
            </div>
            {/* Separator */}
            <div className='px-6 pt-4'>
              <hr className='border-gray-700'/>
            </div>
            {/* Items 2 */}
            <div className='px-6 pt-4'>
              <ul>
              <li className="relative text-gray-500 hover:text-white focus-within:text-white">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <ChartSquareBarIcon className="w-5 h-5 text-white text-gray-500" />
                  </div>
                  <a href="#" className="inline-block w-full py-2 pl-8 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 keychainify-checked">Settings</a>
              </li>
              <li className="relative text-gray-500 hover:text-white focus-within:text-white">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <ChartSquareBarIcon className="w-5 h-5 text-white text-gray-500" />
                  </div>
                  <a href="#" className="inline-block w-full py-2 pl-8 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 keychainify-checked">Notifications</a>
              </li>
              <li className="relative text-gray-500 hover:text-white focus-within:text-white">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                    <ChartSquareBarIcon className="w-5 h-5 text-white text-gray-500" />
                  </div>
                  <a href="#" className="inline-block w-full py-2 pl-8 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 keychainify-checked">Apps</a>
              </li>
              </ul>
            </div>
          </div>
        </div>
        {/* User*/}
        <div className={`pl-6 pr-4 py-4 bg-gray-800 flex items-center justify-between bottom-0 absolute ${openMenu ?'w-64' :'w-20'}`}><div className='flex items-center'>
              <div className="relative w-8 h-8 rounded-full before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:rigth-0  before:bottom-0 before:ring-1 before:ring-white">
              <img className='rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8czzbrLzXJ9R_uhKyMiwj1iGxKhJtH7pwlQ&usqp=CAU" alt="user image" />
              </div>
              <div className='flex flex-col pl-3'>
                <div className='text-sm text-gray-50'>User Name</div>
                <span className='text-xs text-gray-200 font-light tracking-tight'>Email@user.com</span>
              </div>
            </div>
            <button className='text-gray-400 bg-gray-700 rounded'>
             <ChevronDownIcon className="w-4 h-4 text-white text-gray-500" />
            </button>
          </div>
      </aside>
  );
 
}

export default MainNavigation;
