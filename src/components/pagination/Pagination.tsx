import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./pagination.module.css";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  totalPages = 10,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <button className={styles.button} onClick={handlePrevious}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}
      <span className={styles.span}>
        Página {currentPage} de {totalPages}
      </span>
      <button
        className={styles.button}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default Pagination;
