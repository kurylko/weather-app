
const Loader = ({loaderText}) => {

    return (
        <div className='loader-container'>
            <div className='loader'></div>
            {!loaderText ? null : <span>{loaderText}</span>}
        </div>
    )
}
export default Loader;