

//Derived from https://www.geeksforgeeks.org/how-to-use-modal-component-in-reactjs/
const Modal = ({isOpen, onClose, children})=>
{
    if(!isOpen) return null;

    return(
        <div className="z-0 fixed w-full h-full top-0 left-0 bg-gray-900/50 flex justify-center">
            <div className="z-10 m-10 p-5 bg-slate-900 w-11/12 md:w-1/2 lg:w-1/2 h-11/12 md:h-1/2 lg:h-1/2 border rounded-xl flex flex-col justify-between">
                {children}
                <button className="" onClick={onClose}><p className="text-right">Close</p></button>
            </div>
        </div>
    )
};

export default Modal;