import React from "react";
import { Spin } from "antd"
import styles from './styles.module.scss';

export const Loader: React.FC = () => {
  return (
    <Spin
      size="large"
      className={styles.loader}
    />
  );
};
