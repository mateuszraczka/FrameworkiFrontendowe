export default function Header({title}){
    return (
        <header className="bg-white shadow">
          <div className="mx-auto sm:px-4 py-4">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
          </div>
        </header>
    )
}