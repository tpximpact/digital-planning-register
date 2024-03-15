import Link from "next/link"
const Menu = () => {
    return (
        <div className="container-menu" role="menu">
            <Link href="/" >Application Search</Link>
            <Link href="/" >Map view</Link>
        </div>
    )
}

export default Menu