export default () => (<footer id="footer" class="bg-accent-1 dark:bg-black border-t border-accent-2 dark:border-gray-600">
    <nav class="pt-8 columns-2 sm:flex sm:justify-center sm:space-x-12 text-center sm:text-left" aria-label="Footer">
        <div class="pb-6">
            <a href="about" class="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:underline">About</a>
        </div>

        <div class="pb-6">
            <a href="blog" class="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:underline">Blog</a>
        </div>

        <div class="pb-6">
            <a href="posts" class="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:underline">Archive</a>
        </div>

        <div class="pb-6">
            <a href="privacy" class="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:underline">Privacy</a>
        </div>
    </nav>

    <div class="pb-4 text-center text-sm text-gray-600 dark:text-gray-400">
        powered by <a class="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:underline" href="https://servicestack.net/posts/net8-best-blazor">blazor vue</a>
    </div>

    <div class="pb-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Site Design &copy; 2024 locode.dev, content licensed under <a class="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:underline" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</a>.
    </div>

</footer>)