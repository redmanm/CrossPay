"use client"

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "#6b7280",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1f2937",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 11,
    color: "#6b7280",
  },
  value: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1f2937",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0891b2",
  },
})

export function ReceiptPDF({ transfer }: { transfer: any }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>CrossPay Transfer Receipt</Text>
          <Text style={styles.subtitle}>Transaction ID: {transfer.id}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transfer Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>From</Text>
            <Text style={styles.value}>You</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>To</Text>
            <Text style={styles.value}>{transfer.recipientName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Amount Sent</Text>
            <Text style={styles.value}>
              {transfer.amount} {transfer.currency}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Amount Received</Text>
            <Text style={styles.amount}>{transfer.amountInBirr.toFixed(2)} ETB</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transaction Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{new Date(transfer.createdAt).toLocaleDateString()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>{transfer.status.toUpperCase()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fee</Text>
            <Text style={styles.value}>
              {(transfer.amount * 0.01).toFixed(2)} {transfer.currency}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
