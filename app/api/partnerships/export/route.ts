import { NextRequest, NextResponse } from 'next/server'
import { UserRole } from '@prisma/client'
import { requireRole } from '@/lib/auth'
import prisma from '@/lib/prisma'
import ExcelJS from 'exceljs'

export async function GET(request: NextRequest) {
    const userOrError = await requireRole([UserRole.SUPERADMIN, UserRole.WRITER])
    if (userOrError instanceof NextResponse) {
        return userOrError
    }

    try {
        const partnerships = await prisma.partnership.findMany({
            orderBy: { createdAt: 'desc' }
        })

        // Create workbook and worksheet
        const workbook = new ExcelJS.Workbook()
        workbook.creator = 'SPE UP Profile'
        workbook.created = new Date()

        const worksheet = workbook.addWorksheet('Partnership Data', {
            headerFooter: {
                firstHeader: 'SPE UP Partnership Applications'
            }
        })

        // Define columns
        worksheet.columns = [
            { header: 'No', key: 'no', width: 5 },
            { header: 'Name', key: 'name', width: 25 },
            { header: 'Institution', key: 'institution', width: 25 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Subject', key: 'subject', width: 25 },
            { header: 'Message', key: 'message', width: 50 },
            { header: 'File', key: 'filePath', width: 40 },
            { header: 'NDA', key: 'nda', width: 10 },
            { header: 'Created At', key: 'createdAt', width: 18 }
        ]

        // Style header row
        const headerRow = worksheet.getRow(1)
        headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } }
        headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF3C8C98' }
        }
        headerRow.alignment = { vertical: 'middle', horizontal: 'center' }
        headerRow.height = 25

        // Add data rows
        partnerships.forEach((partnership, index) => {
            worksheet.addRow({
                no: index + 1,
                name: partnership.name,
                institution: partnership.institution,
                email: partnership.email,
                subject: partnership.subject,
                message: partnership.message,
                filePath: partnership.filePath || '-',
                nda: partnership.nda ? 'Yes' : 'No',
                createdAt: partnership.createdAt.toLocaleDateString('id-ID')
            })
        })

        // Style data rows
        for (let i = 2; i <= partnerships.length + 1; i++) {
            const row = worksheet.getRow(i)
            row.alignment = { vertical: 'middle', wrapText: true }
            row.border = {
                top: { style: 'thin', color: { argb: 'FFD0D0D0' } },
                bottom: { style: 'thin', color: { argb: 'FFD0D0D0' } },
                left: { style: 'thin', color: { argb: 'FFD0D0D0' } },
                right: { style: 'thin', color: { argb: 'FFD0D0D0' } }
            }
            // Alternate row colors
            if (i % 2 === 0) {
                row.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFF5F5F5' }
                }
            }
        }

        // Generate buffer
        const buffer = await workbook.xlsx.writeBuffer()

        // Return Excel file
        const filename = `partnership_data_${new Date().toISOString().split('T')[0]}.xlsx`
        
        return new NextResponse(buffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        })
    } catch (error) {
        console.error('Export partnerships error:', error)
        return NextResponse.json(
            { error: 'Failed to export partnership data' },
            { status: 500 }
        )
    }
}
