import React from 'react';
import styled from 'styled-components';

interface BrandLogoProps {
  size?: number;
}

const BrandLogo = ({ size = 84 }: BrandLogoProps) => {
    return (
        <StyledWrapper style={{ '--size': `${size}px` } as React.CSSProperties}>
            <span className="loader" />
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  --dot-size: calc(var(--size) * 0.76);
  
  .loader {
    display: block;
    width: var(--size);
    height: var(--size);
    position: relative;
  }

  .loader:before, .loader:after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    width: var(--dot-size);
    height: var(--dot-size);
    border-radius: 50%;
    background: var(--color-primary, #FFF);
    transform: translate(-50% , -100%) scale(0);
    animation: push_401 2s infinite linear;
  }

  .loader:after {
    animation-delay: 1s;
  }

  @keyframes push_401 {
    0%, 50% {
      transform: translate(-50%, 0%) scale(1)
    }

    100% {
      transform: translate(-50%, -100%) scale(0)
    }
  }`;

export default BrandLogo;
