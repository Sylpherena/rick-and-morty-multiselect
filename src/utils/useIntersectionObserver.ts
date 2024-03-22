import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (fetchNextPage: () => Promise<void>) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observedElementRef = useRef(null);

  // Fetch when intersecting
  useEffect(() => {
    if (isIntersecting) {
      fetchNextPage();
      setIsIntersecting(false);
    }
  }, [isIntersecting]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(entry.isIntersecting);
      }
    });

    if (observedElementRef.current) {
      observer.observe(observedElementRef.current); // observe the element
    }

    // Unsubscribe observe on cleanup
    return () => {
      if (observedElementRef.current) {
        observer.unobserve(observedElementRef.current);
      }
    };
  }, [observedElementRef.current]);

  return observedElementRef;
};
