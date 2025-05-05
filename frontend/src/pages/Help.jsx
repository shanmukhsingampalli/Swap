import { motion } from "framer-motion";

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
      fontWeight: "bold",
    },
  };

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      style={helpStyles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        style={helpStyles.title}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Welcome to Stationery Swap!
      </motion.h1>

      <motion.div
        style={helpStyles.section}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2>Follow these simple guidelines to get started:</h2>
        <motion.ul
          style={helpStyles.list}
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            {
              number: "1",
              title: "Sign Up or Log In:",
              content: [
                "New Users: Click on Sign Up to create an account using a username and password.",
                "Existing Users: Click on Log In and enter your credentials.",
              ],
            },
            {
              number: "2",
              title: "List Your Stationery:",
              content: [
                '- After logging in, go to "Add a New Stationary" tab',
                "- Enter the name, quantity, and your contact number",
                "- Click Upload to display your product on the website",
              ],
            },
            {
              number: "3",
              title: "Manage Your Listings:",
              content: [
                "If you wish to remove an item, go to your listings and click on the Delete icon.",
              ],
            },
            {
              number: "4",
              title: "Buy Stationery:",
              content: [
                "Looking for supplies? Click on the Products tab in the top menu to browse available items.",
              ],
            },
          ].map((step, index) => (
            <motion.li
              key={index}
              style={helpStyles.listItem}
              variants={itemVariants}
            >
              <motion.span
                style={helpStyles.number}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {step.number}
              </motion.span>
              <div>
                <strong>{step.title}</strong>
                <div>
                  {step.content.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div
        style={{
          ...helpStyles.section,
          textAlign: "center",
          fontStyle: "italic",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        Enjoy using Stationery Swap! Made by young minds, for young minds.
      </motion.div>
    </motion.div>
  );
}

export default Help;
