I want to create a small app to calculate mortgage-related stuff. I want the app to be written in JavaScript, React JS, Vite, and shadcn/TaliwindCSS. I'll want to eventually deploy this to Github Pages.

You have access to my local filesystem via the filesystem MCP. Please, create the app in the /Users/jprince/code/sandbox/mortgage-calculator directory. You also have access to the internet via the brave_web_search MCP. Feel free to search for any info you need and feel free to ask me any clarifying questions.

The first iteration will be a single page form. Most of the fields in the form will have default values. When a field is changed by the user, the URL should reflect that change (unless the value is the same as the app's default) and the value should be stored in local storage. When the app loads, all of the fields should use local storage defaults as opposed to the app defaults.

Here are the requirements:

Any changes to the form should update the results in real time.

Fields:

Mortgage amount [number] (no app default)

Down payment amount [number] (default to 5%)

Closing cost percentage [number] (default to 3%)

Buyer's agent commission percentage [number] (default to 3%)

Seller's agent commission percentage [number] (default to 3%)

"Share" button that adds all the field values to the current URL and copies it to the clipboard.

Results should display the mortgage amount, calculations for each field (percentages applied to the mortgage amount), and the total of all of the calculations.

Results should project incrementing amounts higher than the entered mortgage amount. For example, if I enter 100,000 as the mortgage amount, I want to see table row with the mortgage amount (100k), down payment (5k), closing costs (3k), buyer's agent commission (3k), and seller's agent commission (3k) as well as rows for 510k, 520k, 530k, and all the way up to 600k.

Display results in a table.

The app should be responsive and be useable on mobile devices.

