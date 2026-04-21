import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: 'Helvetica' },
  header: { fontSize: 24, marginBottom: 20, textAlign: 'center', color: '#007bff', fontWeight: 'bold' },
  section: { marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#EEE', paddingBottom: 5 },
  label: { fontWeight: 'bold', marginBottom: 2, color: '#555' },
  value: { marginBottom: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between' }
});

const PartnerPdfTemplate = ({ partner, categoryName, regionNames }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <Text style={styles.header}>{partner.company}</Text>

      {/* Main Info */}
      <View style={styles.section}>
        <Text style={styles.label}>Category</Text>
        <Text style={styles.value}>{categoryName || "Uncategorized"}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Titles / Services</Text>
        <Text style={styles.value}>{partner.titles?.join(', ') || "N/A"}</Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.section, { flex: 1 }]}>
          <Text style={styles.label}>Cost</Text>
          <Text style={styles.value}>${partner.cost}</Text>
        </View>
        <View style={[styles.section, { flex: 1 }]}>
          <Text style={styles.label}>Duration</Text>
          <Text style={styles.value}>{partner.duration} Months</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Regions</Text>
        <Text style={styles.value}>{regionNames.join(', ') || "Global"}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Contact</Text>
        <Text style={styles.value}>{partner.contact}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{partner.description}</Text>
      </View>
    </Page>
  </Document>
);

export default PartnerPdfTemplate;