export const useNewsletterApi = () => {
  // we are calling useState to 1) return the state and 2) pass the setState function
  // to our subscribe function, so we can set the state from there
  const [state, setState] = useState(null);
  return [state, email => subscribeToNewsletter(email, setState)];
};
