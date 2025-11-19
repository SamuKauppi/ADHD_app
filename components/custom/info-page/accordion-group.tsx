import { StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

interface CustomAccordionProps {
    accordionParts: any[];
}

// Accordion group and their content
const AccordionGroup = ({ accordionParts}: CustomAccordionProps) => {
    return (
        <Accordion type="single" style={styles.accordionContainer} defaultValue='0'>
            {accordionParts.map((part: { title: string; text: string[] }, idx: number) => (
                <AccordionItem key={idx} value={idx.toString()} style={styles.accordionItem}>
                    <AccordionTrigger style={styles.accordionTrigger}>
                        <Text style={styles.accordionTitle}>{part.title}</Text>
                    </AccordionTrigger>
                    <AccordionContent>
                        {part.text.map((line: string, idx2: number) => (
                            <Text key={idx2} style={styles.accordionText}>
                                {line}
                            </Text>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            ))}

        </Accordion>
    );
};

export default AccordionGroup;

const styles = StyleSheet.create({
    accordionContainer: {},
    accordionItem: { marginTop: 10, justifyContent: 'center' },
    accordionTrigger: {alignItems: 'center'},
    accordionTitle: { fontSize: 26, fontWeight: 'bold', lineHeight: 30 },
    accordionText: { fontSize: 18, lineHeight: 24, marginVertical: 7 },
});
