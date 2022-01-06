import React, { FC, Suspense, useEffect, useState } from 'react';
import Loadable from 'react-loadable';

import useForceUpdate from '@hooks/useForceUpdate';

// ========== Sample1 ==========
export { default as Sample1 } from './Sample1';

// ========== Sample2 ==========
const Loading = (props) => {
  const { pastDelay } = props;
  const shouldRender = typeof pastDelay !== 'boolean' || pastDelay;
  console.log(`render Loading(shouldRender=${shouldRender})`, props);
  return shouldRender && <div>Loading...</div>;
};

export const Sample2 = Loadable({
  loader: () => import('./Sample2'),
  loading: Loading,
  delay: 30000,
});

// ========== Sample3 ==========
interface ComponentModule {
  default: React.ComponentType;
}

interface LazyOptions {
  loader: () => Promise<ComponentModule>;
  loading: React.ComponentType;
}

const lazy = (options: LazyOptions) => {
  const { loader, loading: Loading } = options;

  let Component = null;

  const InnerComponent: FC = (props) => {
    const [loading, setLoading] = useState(Component === null);

    useEffect(() => {
      if (!loading) {
        return;
      }
      loader().then((comp) => {
        setTimeout(() => {
          Component = comp.default;
          setLoading(false);
        }, 1000);
      });
    }, []);

    return loading ? <Loading></Loading> : <Component {...props} />;
  };

  return React.memo(InnerComponent);
};

export const Sample3 = lazy({
  loader: () => import('./Sample3'),
  loading: Loading,
});

// ========== Sample4 ==========
const lazy2 = (options: LazyOptions) => {
  const { loader, loading: Loading } = options;

  const CustomComponent = React.lazy(loader);

  const InnerComponent = () => {
    return (
      <Suspense fallback={<Loading />}>
        <CustomComponent />
      </Suspense>
    );
  };

  return React.memo(InnerComponent);
};

export const Sample4 = lazy2({
  loader: () =>
    Promise.all([
      import('./Sample4'),
      new Promise((resolve) => setTimeout(resolve, 1000)),
    ]).then(([moduleExports]) => moduleExports),
  loading: Loading,
});

// ========== final ==========
const lazzy = (() => {
  const supportSuspense = !!React.Suspense;

  interface InnerComponentProps {
    Comp: React.ComponentType;
    Loading: React.ComponentType;
    [prop: string]: any;
  }

  let InnerComponent: FC<InnerComponentProps>;
  if (supportSuspense) {
    InnerComponent = ({ Comp, Loading, ...props }) => {
      return (
        <Suspense fallback={<Loading />}>
          <Comp {...props} />
        </Suspense>
      );
    };
  } else {
    InnerComponent = ({ Comp, Loading, ...props }) => {
      return Comp ? <Comp {...props} /> : <Loading />;
    };
  }

  return ({ loader, loading }: LazyOptions) => {
    let Component: React.ComponentType = supportSuspense
      ? React.lazy(loader)
      : null;

    const WrapperComponent: FC = (...props) => {
      const forceUpdate = useForceUpdate();

      useEffect(() => {
        if (!supportSuspense) {
          loader().then((comp) => {
            Component = comp.default;
            forceUpdate();
          });
        }
      }, []);

      return <InnerComponent Comp={Component} Loading={loading} {...props} />;
    };

    return React.memo(WrapperComponent);
  };
})();

export const Sample5 = lazzy({
  loader: () =>
    Promise.all([
      import('./Sample4'),
      new Promise((resolve) => setTimeout(resolve, 1000)),
    ]).then(([moduleExports]) => moduleExports),
  loading: Loading,
});
