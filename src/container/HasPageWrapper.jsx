const HasPageWrapper = ({ children, isPage, component: Component }) => {
  return <>{isPage ? <Component>{children}</Component> : <>{children}</>}</>;
};
export default HasPageWrapper;
