import React from 'react';
import { Box, Flex, Grid, Heading, Text, Image, Table, Tbody, Tr, Td, Thead, Th } from '@chakra-ui/react';

const Invoice = () => {
    return (
        <Box border="1px" borderColor="gray.200" p={5} m={5} maxW="800px" mx="auto">
            {/* Business Details */}
            <Flex justifyContent="space-between" alignItems="center" mb={10}>
                <Box>
                    <Box mb={4}>
                        <Text fontSize="2xl" fontWeight="bold">Business Name</Text>
                        <Text>Business karne ka naya tareeka</Text>
                    </Box>
                    <Box>
                        <Text fontSize="lg" fontWeight="bold">BILL TO</Text>
                        <Text>Sample Party</Text>
                        <Text>No F2, Outer Circle, Connaught Circus, New Delhi, 110001</Text>
                        <Text>Mobile: 7400417400</Text>
                        <Text>GSTIN: 07ABCCZH2702H4ZZ</Text>
                        <Text>State: Delhi</Text>
                    </Box>
                </Box>
                <Box textAlign="right">
                    <Text fontSize="lg" fontWeight="bold">SHIP TO</Text>
                    <Text>Sample Party</Text>
                    <Text>1234123 324324324, Bengaluru</Text>
                </Box>
            </Flex>

            {/* Customize Invoice Section */}
            <Flex justifyContent="center" alignItems="center" mb={10} py={10} bg="gray.100">
                <Box textAlign="center">
                    <Image boxSize="50px" src="/path-to-your-icon.png" alt="Customize Icon" mb={4} />
                    <Heading size="lg">Customize your own Invoice</Heading>
                </Box>
            </Flex>

            {/* Item Table */}
            <Box>
                <Text fontSize="xl" fontWeight="bold" mb={4}>Item Table Columns</Text>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>NO.</Th>
                            <Th>ITEMS</Th>
                            <Th>HSN</Th>
                            <Th>BATCH NO.</Th>
                            <Th>EXP. DATE</Th>
                            <Th>MFG DATE</Th>
                            <Th>QUANTITY</Th>
                            <Th>PRICE/ITEM</Th>
                            <Th>DISCOUNT</Th>
                            <Th>TOTAL</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>1</Td>
                            <Td>
                                <Text fontWeight="bold">SAMSUNG A30</Text>
                                <Text fontSize="sm">Samsung phone</Text>
                            </Td>
                            <Td>1234</Td>
                            <Td>BATCH NO.</Td>
                            <Td>EXP. DATE</Td>
                            <Td>MFG DATE</Td>
                            <Td>1 PCS</Td>
                            <Td>10,000</Td>
                            <Td>0</Td>
                            <Td>10,000</Td>
                        </Tr>
                        <Tr>
                            <Td>2</Td>
                            <Td>
                                <Text fontWeight="bold">A12</Text>
                                <Text fontSize="sm">Samsung phone</Text>
                            </Td>
                            <Td>40511209</Td>
                            <Td>-</Td>
                            <Td>-</Td>
                            <Td>MFG DATE</Td>
                            <Td>1 BOX</Td>
                            <Td>342.86</Td>
                            <Td>0</Td>
                            <Td>342.86</Td>
                        </Tr>
                        <Tr>
                            <Td>3</Td>
                            <Td>
                                <Text fontWeight="bold">Headphones BT12</Text>
                                <Text fontSize="sm">Wireless headphone</Text>
                            </Td>
                            <Td>2032</Td>
                            <Td>-</Td>
                            <Td>-</Td>
                            <Td>-</Td>
                            <Td>2 PCS</Td>
                            <Td>900</Td>
                            <Td>0</Td>
                            <Td>1,800</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Box>

            {/* Totals */}
            <Box mt={10} textAlign="right">
                <Text>IGST @ 5%: ₹107.14</Text>
                <Text>IGST @ 18%: ₹1,800</Text>
                <Text fontWeight="bold">Total: ₹14,050</Text>
            </Box>
        </Box>
    );
};

export default Invoice;
