import { useEffect } from "react";
import testData from "./data/tt.json";

function Test() {
  useEffect(() => {
    // Make a deep copy and update testName
    const updatedTests = testData.map((item, index, arr) => ({
      ...item,
      testName: (arr.length - index).toString()
    }));

    // Create downloadable file
    const blob = new Blob([JSON.stringify(updatedTests, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);

    // Auto-trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = "updated_tests.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return <div>Processing and downloading updated JSON...</div>;
}

export default Test;
