import React from 'react';
import s from './style.module.less';

export const LoadingAnimation = () => {
    return (
        <div className={s.loadingAnimationContainer}>
            <div className={s.loadingAnimation}><div></div><div></div><div></div><div></div></div>
        </div>
    )
}