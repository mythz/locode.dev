import { TextInput } from "./Form"
import DarkModeToggleLite from './DarkModeToggleLite'

export default () => (
    <header class="border-b border-gray-200 dark:border-gray-800 pr-3" data-module="mjs/header.mjs">
        <div class="flex flex-wrap items-center">
            <div class="absolute z-10 top-2 left-2 sm:static flex-shrink flex-grow-0">
                <div class="cursor-pointer">
                    <a class="navbar-brand flex items-center text-blue-600 dark:text-gray-100" href="/">
                    <svg class="w-8 h-8 sm:ml-4 sm:w-10 sm:h-10 align-middle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4 10.4V4a1 1 0 0 1 1-1h5V1h4v2h5a1 1 0 0 1 1 1v6.4l1.086.326a1 1 0 0 1 .682 1.2l-1.516 6.068A4.992 4.992 0 0 1 16 16a4.992 4.992 0 0 1-4 2a4.992 4.992 0 0 1-4-2a4.992 4.992 0 0 1-4.252 1.994l-1.516-6.068a1 1 0 0 1 .682-1.2L4 10.4zm2-.6L12 8l2.754.826l1.809.543L18 9.8V5H6v4.8zM4 20a5.978 5.978 0 0 0 4-1.528A5.978 5.978 0 0 0 12 20a5.978 5.978 0 0 0 4-1.528A5.978 5.978 0 0 0 20 20h2v2h-2a7.963 7.963 0 0 1-4-1.07A7.963 7.963 0 0 1 12 22a7.963 7.963 0 0 1-4-1.07A7.963 7.963 0 0 1 4 22H2v-2h2z"></path></svg>
                            <span class="hidden ml-2 sm:block text-2xl font-semibold">locode</span>
                    </a>
                </div>
            </div>
            <div class="flex flex-grow flex-shrink flex-nowrap justify-end items-center">
                <nav class="relative flex flex-grow leading-6 font-semibold text-slate-700 dark:text-slate-200">
                    <ul class="flex flex-wrap items-center justify-end w-full m-0">
                        <li class="relative flex flex-wrap just-fu-start m-0 w-40 sm:w-52 md:w-96 sm:pr-4">
                            <form class="w-full m-0" method="get" action="questions">
                                <TextInput id="q" label="" placeholder="Search..." />
                                <input type="submit" class="hidden" />
                            </form>
                        </li>
                        <li class="relative flex flex-wrap just-fu-start m-0">
                            <a href="questions" class="p-4 flex items-center justify-start mw-full hover:text-sky-500 dark:hover:text-sky-400" ActiveClass="text-blue-700 dark:text-blue-300">Questions</a>
                        </li>
                        <li class="relative flex flex-wrap just-fu-start m-0">
                            <a href="https://pvq.app/leaderboard" class="p-4 flex items-center justify-start mw-full hover:text-sky-500 dark:hover:text-sky-400" ActiveClass="text-blue-700 dark:text-blue-300">Leaderboard</a>
                        </li>
                        <li class="relative flex flex-wrap just-fu-start m-0">
                            <a href="https://pvq.app/blog" class="p-4 flex items-center justify-start mw-full hover:text-sky-500 dark:hover:text-sky-400" ActiveClass="text-blue-700 dark:text-blue-300">Blog</a>
                        </li>

                        <li class="relative flex flex-wrap just-fu-start m-0">
                            <DarkModeToggleLite />
                        </li>

                    </ul>
                </nav>
            </div>
        </div>
    </header>)
