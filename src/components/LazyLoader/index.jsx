import React, { Suspense, lazy } from "react";
// import { withRouter } from "react-router";
// import BigLoader from "../Skeleton/BigLoader";

export const LazyComponent = (dynamicImport) => {
  const Component = lazy(dynamicImport);
  Component.preLoad = dynamicImport;
  return Component;
};

// const LazyComponentLoader = ({ Component, ...props }) => {
//   return (
//     <Suspense fallback={<BigLoader />}>
//       <Component {...props} />
//     </Suspense>
//   );
// };

// export default withRouter(LazyComponentLoader);
