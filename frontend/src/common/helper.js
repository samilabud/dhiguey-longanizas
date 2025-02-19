// Function to determine the class for active and pending states
export const getNavLinkClass = ({ isActive, isPending }) =>
  `transition ${
    isPending
      ? "text-white hover:text-gray-300"
      : isActive
      ? "text-gray-300"
      : "text-white"
  }`;
