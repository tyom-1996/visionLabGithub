import { Button } from '@/components/shared/Button';
import { ApiUrl } from '@/consts/apiUrl';
import { DocumentSection } from '@/types/components/documentation';
import styles from './styles.module.scss';

const Documentation = ({ documentation }: { documentation: DocumentSection[] }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.docsSectionsList}>
        {documentation.map((documentSection, index) => (
          <div key={index + documentSection.name} className={styles.docsListsWrapper}>
            {documentSection.children.map((documentsList, deepIndex) => (
              <div
                className={styles.docsList}
                key={deepIndex + documentsList.name}
              >
                <p className={styles.docsListTitle}>
                  {documentsList.name}
                </p>
                <div className={styles.docsListChildWrapper}>
                  {documentsList.elements.map((document, index) => (
                    <div
                      className={styles.document}
                      key={index + document.name}
                    >
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
                      <p className={styles.documentSize}>
                        {document.file_size}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
        )}
      </div>
    </div>
  );
};

export default Documentation;
