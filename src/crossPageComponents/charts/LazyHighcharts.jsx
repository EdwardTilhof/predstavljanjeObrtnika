import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReactModule from 'highcharts-react-official';

const HighchartsReact = HighchartsReactModule.default || HighchartsReactModule;

/**
 * LazyHighcharts - A wrapper for Highcharts that's loaded on demand
 * This component should be lazy loaded to avoid including Highcharts in initial bundle
 */
const LazyHighcharts = React.forwardRef((props, ref) => {
  return (
    <div role="img" aria-label={props.options?.title?.text || 'Chart'}>
      <HighchartsReact
        ref={ref}
        highcharts={Highcharts}
        {...props}
      />
    </div>
  );
});

LazyHighcharts.displayName = 'LazyHighcharts';

export default LazyHighcharts;
