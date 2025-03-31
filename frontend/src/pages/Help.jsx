function Help() {
  const helpStyles = {
    container: {
      padding: "20px",
      maxWidth: "800px",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.6",
    },
    title: {
      color: "#2c3e50",
      marginBottom: "20px",
      fontSize: "2rem",
    },
    section: {
      backgroundColor: "#fff",
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "15px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    list: {
      listStyleType: "none",
      padding: "0",
    },
    listItem: {
      margin: "10px 0",
      display: "flex",
      alignItems: "flex-start",
    },
    number: {
      minWidth: "24px",
      height: "24px",
      backgroundColor: "#1aac83",
      color: "white",
      borderRadius: "50%",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "10px",
    },
  };

  return (
    <div style={helpStyles.container}>
      <h1 style={helpStyles.title}>Welcome to Stationery Swap!</h1>
      <div style={helpStyles.section}>
        <h2>Follow these simple guidelines to get started:</h2>
        <ul style={helpStyles.list}>
          <li style={helpStyles.listItem}>
            <span style={helpStyles.number}>1</span>
            <div>
              <strong>Sign Up or Log In:</strong>
              <div>
                New Users: Click on Sign Up to create an account using a
                username and password.
              </div>
              <div>
                Existing Users: Click on Log In and enter your credentials.
              </div>
            </div>
          </li>
          <li style={helpStyles.listItem}>
            <span style={helpStyles.number}>2</span>
            <div>
              <strong>List Your Stationery:</strong>
              <div>- After logging in, go to "Add a New Stationary" tab</div>
              <div>- Enter the name, quantity, and your contact number</div>
              <div>- Click Upload to display your product on the website</div>
            </div>
          </li>
          <li style={helpStyles.listItem}>
            <span style={helpStyles.number}>3</span>
            <div>
              <strong>Manage Your Listings:</strong>
              <div>
                If you wish to remove an item, go to your listings and click on
                the Delete icon.
              </div>
            </div>
          </li>
          <li style={helpStyles.listItem}>
            <span style={helpStyles.number}>4</span>
            <div>
              <strong>Buy Stationery:</strong>
              <div>
                Looking for supplies? Click on the Products tab in the top menu
                to browse available items.
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div
        style={{
          ...helpStyles.section,
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        Enjoy using Stationery Swap! Made by young minds, for young minds.
      </div>
    </div>
  );
}
export default Help;
