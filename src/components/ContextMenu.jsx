export default function ContextMenu({contextMenuContent, position, setLoading}){
    const handleClick = async (action) => {
        const id = contextMenuContent.id;
        try{
            setLoading(true);
            await action(id);
        }
        catch(error){

        }
        finally{
            setLoading(false);
        }
    }

    return(
        <div
          className="rounded-lg absolute flex flex-col w-[10rem] p-3 bg-white border shadow z-50"
          style={{
            top: position.y,
            left: position.x,
          }}
        >
            {contextMenuContent.options.map((option) => (
                option.isVisible && <button onClick={() => handleClick(option.action)} key={option.title} className="px-4 py-2 hover:bg-gray-200">{option.title}</button>
            ))}
        </div>
    )
}