export function DownloadInstruction() {
    return ( <div className="text-left mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          How to Download Your YouTube History
        </h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>
            Go to{" "}
            <a
              href="https://takeout.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline"
            >
              Google Takeout
            </a>{" "}
            and log in with your Google account.
          </li>
          <li>Click on the <strong>"Deselect all"</strong> button.</li>
          <li>
            Scroll down and select{" "}
            <strong>"YouTube and YouTube Music"</strong>.
          </li>
          <li>
            Click <strong>"All YouTube data included"</strong>, uncheck
            unnecessary options (keep <strong>"Watch history"</strong>{" "}
            checked), and click <strong>"OK"</strong>.
          </li>
          <li>
            Under "File type, frequency, and destination":
            <ul className="list-disc list-inside ml-4">
              <li>Set file type to <strong>JSON</strong>.</li>
              <li>Set file size to your preferred limit (e.g., 2GB).</li>
            </ul>
          </li>
          <li>Click <strong>"Next step"</strong>.</li>
          <li>
            Choose delivery method:
            <ul className="list-disc list-inside ml-4">
              <li>Select <strong>"Send download link via email"</strong>.</li>
              <li>Alternatively, choose Google Drive, Dropbox, or OneDrive.</li>
            </ul>
          </li>
          <li>
            Click <strong>"Create export"</strong> and wait for the email with
            the download link.
          </li>
          <li>
            Download the ZIP file, unzip it, and locate the{" "}
            <strong>"watch-history.json"</strong> file.
          </li>
          <li>Upload the JSON file here to analyze your YouTube history.</li>
        </ol>
      </div>);
}