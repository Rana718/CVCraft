import { db } from "../../../../utils/db";
import { ResumeTitle } from "../../../../utils/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { id, title, user, email } = body;

    try {
        const response = await db.insert(ResumeTitle).values({
            unicon_id: id,
            title: title,
            user: user,
            email: email
        });

        console.log(response);
        if (response) {
            return NextResponse.json({ message: 'success' }, { status: 200 });
        }
    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ message: 'Email query parameter is required' }, { status: 400 });
    }

    try {
        const resumes = await db.select().from(ResumeTitle).where(eq(ResumeTitle.email, email));

        if (resumes.length > 0) {
            return NextResponse.json(resumes, { status: 200 });
        } else {
            return NextResponse.json({ message: 'No resumes found' }, { status: 404 });
        }
    }catch (err: any) {
        console.log(err);
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
    
}


export async function PUT(req: NextRequest) {
    const body = await req.json();
    const { id, firstName, lastName, jobTitle, address, phone, res_email} = body;

    if(!id){
        return NextResponse.json({ message: 'Email query parameter is required' }, { status: 400 });
    }

    try {
        const response = await db.update(ResumeTitle).set({
            firstName: firstName,
            lastName: lastName,
            jobTitle: jobTitle,
            address: address,
            phone: phone,
            res_email: res_email
        }).where(eq(ResumeTitle.unicon_id, id));

        if(response.rowCount > 0){
            return NextResponse.json({ message: 'success' }, { status: 200 });
        }else{
            return NextResponse.json({ message: 'Resume Not found' }, { status: 404 });
        }
    }catch(e:any){
        console.log(e);
        return NextResponse.json({ message: e.message }, { status: 400 });
    }
}
