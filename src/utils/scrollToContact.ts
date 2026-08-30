export const scrollToContact = (navigate?: (path: string) => void) => {
  if (navigate) {
    navigate('/contact');
  } else {
    window.location.href = '/contact';
  }
};
