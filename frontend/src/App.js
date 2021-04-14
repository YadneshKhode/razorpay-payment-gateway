import logo from "./logo.svg";
import "./App.css";
function loadRazorpay(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
function App() {
  async function displayRazorpay() {
    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    console.log("halo");
    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }
    const dataReceived = await fetch("http://localhost:5000/razorpay", {
      method: "POST",
    }).then((data) => data.json());

    console.log(dataReceived);

    const options = {
      key: "rzp_test_Vja9sKOBjy7E5Z", // Enter the Key ID generated from the Dashboard
      amount: dataReceived.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: dataReceived.currency,
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: dataReceived.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          className="App-link"
          onClick={displayRazorpay}
          rel="noopener noreferrer"
        >
          Donate 5Rupee
        </button>
      </header>
    </div>
  );
}

export default App;
