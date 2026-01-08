import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import { Button } from '@/components/shared/Button';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { ComplianceDocumentType } from '@/types/components/compliance';
import styles from './styles.module.scss';
import { ApiUrl } from '@/consts/apiUrl';

const ComplianceDocumentation = ({ documents }: { documents: ComplianceDocumentType[] }) => {
  return (
    <div className={styles.wrapper}>
      <AdvancedTextBlock
        title="Documents"
        titleVariant="h2"
        isLabelInParentheses
      />
      <div className={styles.docsSectionsWrapper}>
        {documents.map((documentSection, index) => (
          <div key={index + documentSection.name} className={styles.docsSectionList}>
            <p className={styles.docsSectionTitle}>{documentSection.name}</p>
            <div className={styles.docsListWrapper}>
              {documentSection.elements.map((document, deepIndex) => (
                <div key={deepIndex + document.name} className={styles.document}>
                  <Button
                    variant="transparent-primary-text"
                    className={styles.documentNameBtn}
                    svgId="file"
                    href={ApiUrl.MAIN + document.path}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.documentName}>{document.name}</span>
                  </Button>
                  <p className={styles.documentSize}>{document.file_size}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withErrorBoundary(ComplianceDocumentation);
