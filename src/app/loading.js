import './global.css';

const Loading = ({loaderText}) => {

    return (
        <div className='loader'>
            {!loaderText ? null : <span>{loaderText}</span>}
        </div>
    )
}
export default Loading;