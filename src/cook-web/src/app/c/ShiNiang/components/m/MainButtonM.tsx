import styles from './MainButtonM.module.scss';

import { memo, forwardRef, useState } from 'react';
import classNames from 'classnames';

import { Button } from '@/components/ui/Button';

export const MainButtonM = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(false);

  // Prevent duplicate submissions
  const _onClick = e => {
    if (loading) {
      return;
    }
    // @ts-expect-error EXPECT
    const ret = props.onClick?.(e);
    if (!(ret instanceof Promise)) {
      return;
    }

    setLoading(true);
    ret
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <Button
      // @ts-expect-error EXPECT
      ref={ref}
      color='primary'
      fill='solid'
      shape='rounded'
      {...props}
      onClick={_onClick}
      // @ts-expect-error EXPECT
      className={classNames(styles.mainButtonM, props.className)}
    />
  );
});

MainButtonM.displayName = 'MainButtonM';

export default memo(MainButtonM);
