import dotenv from "dotenv";
dotenv.config();
import path from "path";

import { NextResponse, NextRequest } from "next/server";
import fs from "fs";

export const GET = (request: NextRequest) => {
	try {
		if( !process.env.ACCESS_COUNT_PATH || !process.env.ACCESS_IPS_PATH ){
			return NextResponse.json({ message: "File not found" }, { status: 404 });
		}
	
		const IP = request.headers.get('x-forwarded-for')?.toString();

		const countFilePath = path.join(process.cwd(), process.env.ACCESS_COUNT_PATH);
		const IPListFilePath = path.join(process.cwd(), process.env.ACCESS_IPS_PATH);
		console.log(fs.existsSync(countFilePath))
		if( !fs.existsSync(countFilePath) ){
			fs.writeFileSync(countFilePath, JSON.stringify({ count: 0 }));
		}

		if( !fs.existsSync(IPListFilePath) ){
			fs.writeFileSync(IPListFilePath, JSON.stringify([]));
		}
		
		const countFile = JSON.parse(fs.readFileSync(countFilePath, "utf8"));
		const IPListFile = JSON.parse(fs.readFileSync(IPListFilePath, "utf8"));
	
		if( !IPListFile.includes(IP) ){
			IPListFile.push(IP);
			fs.writeFileSync(IPListFilePath, JSON.stringify(IPListFile));
		}
		
		countFile.count++;
		fs.writeFileSync(countFilePath, JSON.stringify(countFile));
	
		return NextResponse.json({ message: "Success", count: countFile.count, distinctCount: IPListFile.length }, { status: 200 });

	} catch(e: any){
		return NextResponse.json({ message: "Error", error: e.message }, { status: 500 });
	}
	
}