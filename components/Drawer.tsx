// import { ShoppingCart, X } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// // import { HomeIcon, PhoneIcon, FileQuestion } from "lucide-react"

// const Drawer = () => {
//   return (
//     <div className="drawer absolute z-40 w-screen h-screen lg:hidden">
//       <input id="my-drawer" type="checkbox" className="drawer-toggle" />
//       <div className="drawer-content">
//         {/* Page content here */}
//       </div> 
//       <div className="drawer-side">
//         <label htmlFor="my-drawer" className="drawer-overlay"></label>
//         <ul className="menu menu-vertical p-4 w-80 h-full bg-base-200 text-base-content">
//           {/* Sidebar content here */}
//           <li className="block">
//             <div className="relative">
//               <Link href="/" className="flex items-center gap-2">
//                 <Image src="/logo.svg" alt="Logo" width={20} height={20} />
//                 <h1 className="font-[800] text-brand-accent">Clickbuy</h1>
//               </Link>
//               <label htmlFor="my-drawer">
//                 <X className="ml-auto absolute right-2 bottom-2" />
//               </label>
//             </div>
//           </li>
//           <li>
//               {/* <HomeIcon /> */}
//               <Link href="/">Home</Link>
//             </li>
//             <li>
//               <Link href="/products">Products</Link>
//             </li>
//             <li>
//               <Link href="/categories">Categories</Link>
//             </li>
//             <li>
//               <Link href="/about">About Us</Link>
//             </li>{" "}
//             <li>
//               <Link href="/contact">Contact</Link>
//             </li>
//             <li className="mt-auto">
//             <Link href="/cart" className="relative cursor-pointer">
//               <div className="indicator relative right-5">
//                 <ShoppingCart className="ml-5" width="1.4rem" />
//                 <div className="badge badge-error badge-xs indicator-item"></div>
//               </div>
//             </Link>
//             </li>
//         </ul>
//       </div>
//     </div>
//   )
// }

// export default Drawer
