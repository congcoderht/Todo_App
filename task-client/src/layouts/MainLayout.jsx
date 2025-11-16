import SideBar from "../components/SideBar";

export default function MainLayout({children}) {
    return ( 
        <div className="flex">
            <SideBar/>
            <div>
                {children}
            </div>
        </div>
     );
}