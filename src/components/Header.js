const Header = () => {
    return (
        <ul className='flex ml-auto w-full font-bold xsm:justify-center md:justify-center'>
            <li className='text-xs text-gray-800 ml-auto mr-6 border-b-2 border-green-400 cursor-pointer xsm:mr-3 xsm:ml-0 md:ml-0'>
                Weather
            </li>
            <li className='text-xs text-gray-800 mr-6 alert-notice cursor-pointer border-b-2 hover:border-green-400 xsm:mr-3'>
                Alerts
            </li>
            <li className='text-xs text-gray-800 mr-6 cursor-pointer border-b-2 hover:border-green-400 xsm:mr-3'>
                Map
            </li>
            <li className='text-xs text-gray-800 mr-6 cursor-pointer border-b-2 hover:border-green-400 xsm:mr-3'>
                Satelite
            </li>
            <li className='text-xs text-gray-800 cursor-pointer border-b-2 hover:border-green-400 '>
                News
            </li>
        </ul>
    );
};

export default Header;
