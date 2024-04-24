import Layout from "../components/Layout"

export default () => (<Layout title="Not Found">
    <div className="">
        <main role="main" className="h-screen px-4 text-black bg-white text-center flex flex-col items-center justify-center">
            <div className="-mt-48 flex items-center">
                <h1 className="inline-block border-gray-300 border-r m-0 mr-5 py-2 pr-4 text-2xl font-medium">404</h1>
                <div className="inline-block text-left">
                    <h2 className="text-sm font-normal">This page does not exist.</h2>
                </div>
            </div>
            <div className="mt-2">
                <button onclick="history.back()"
                    className="inline-flex justify-center py-1 px-2 shadow rounded text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M10.05 16.94v-4h8.92l.03-2.01h-8.95V6.94l-5 5Z" />
                    </svg>
                    back
                </button>
            </div>
        </main>
    </div>
</Layout>)